from django.http import response
from django.db.models import Q
from django.shortcuts import get_object_or_404, render
from TreeBio.models import TreeBio2
from core.authentication import CustomTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from TreeBio.libs.tree_service import recursive_node_to_dict, treebio2_image_helper, treebio_helper
from django.http import HttpResponse
from base64 import b64decode

# Create your views here.
class GetFamilyTreeApiView(generics.ListAPIView):
    
    """
        api to get the family tree node
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        if self.kwargs.get("id"):            
            bio = generics.get_object_or_404(TreeBio2, pk=self.kwargs.get("id",))
        else:
            bio = TreeBio2.objects.first()
            
        if bio:
            data = recursive_node_to_dict(bio)
            
            response_data = dict()
            
            response_data["message"] = "success"
            response_data["data"] = {"root": data}
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({"message": "No Tree Found"}, status=status.HTTP_400_BAD_REQUEST)
            
        
        
class GetFamilyTreeDetailApiView(generics.RetrieveAPIView):
    
    """
        api to get the family tree node details
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):    
        bio = get_object_or_404(TreeBio2, pk=self.kwargs["id"])

        tree_list = []

        children = TreeBio2.objects.filter(parent=bio)
        children_list = [child for child in children]
        grandchildren = TreeBio2.objects.filter(parent__in=children_list)

        tree_list.append({
                    "id": bio.id,
                    "first_name": bio.first_name,
                    "last_name": bio.last_name,
                    "full_name": (str(bio.last_name) + " " + str(bio.first_name)),
                    "gender": bio.gender,
                    "marital_status": bio.marital_status,
                    "image": treebio2_image_helper(bio),
                    "avatar": treebio2_image_helper(bio),
                    "bio": bio.bio,
                    "pid": bio.parent.id if bio.parent else 0,
                    "spouse": (bio.spouse.last_name + " " + bio.spouse.first_name) if bio.spouse else ""
                }
            )
        for tree_node in children:            
            tree_list.append({
                    "id": tree_node.id,
                    "first_name": tree_node.first_name,
                    "last_name": tree_node.last_name,
                    "full_name": (str(tree_node.last_name) + " " + str(tree_node.first_name)),
                    "gender": tree_node.gender,
                    "marital_status": tree_node.marital_status,
                    "image": treebio2_image_helper(tree_node),
                    "avatar": treebio2_image_helper(tree_node),
                    "bio": tree_node.bio,
                    "pid": tree_node.parent.id if tree_node.parent else 0,
                    "spouse": (tree_node.spouse.last_name + " " + tree_node.spouse.first_name) if tree_node.spouse else ""
                }
            )
        for tree_node in grandchildren:            
            tree_list.append({
                    "id": tree_node.id,
                    "first_name": tree_node.first_name,
                    "last_name": tree_node.last_name,
                    "full_name": (str(tree_node.last_name) + " " + str(tree_node.first_name)),
                    "gender": tree_node.gender,
                    "marital_status": tree_node.marital_status,
                    "image": treebio2_image_helper(tree_node),
                    "avatar": treebio2_image_helper(tree_node),
                    "bio": tree_node.bio,
                    "pid": tree_node.parent.id if tree_node.parent else 0,
                    "spouse": (tree_node.spouse.last_name + " " + tree_node.spouse.first_name) if tree_node.spouse else ""
                }
            )
        
        data = treebio_helper(bio)
        data['tree'] = tree_list
                
        response_data = dict()
        response_data["message"] = "success"
        response_data["data"] = data
        
        return Response(response_data, status=status.HTTP_200_OK)


class GetFamilyTreeApiViewApiViewV2(generics.ListAPIView):
    """
        api to get the family tree v2
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):       
        tree = TreeBio2.objects.all()
        
        tree_list = []
        
        for tree_node in tree:
            
            tree_list.append({
                    "id": tree_node.id,
                    "first_name": tree_node.first_name,
                    "last_name": tree_node.last_name,
                    "full_name": (str(tree_node.last_name) + " " + str(tree_node.first_name)),
                    "gender": tree_node.gender,
                    "marital_status": tree_node.marital_status,
                    "image": treebio2_image_helper(tree_node),
                    "avatar": treebio2_image_helper(tree_node),
                    "bio": tree_node.bio,
                    "pid": tree_node.parent.id if tree_node.parent else 0,
                    "spouse": (tree_node.spouse.last_name + " " + tree_node.spouse.first_name) if tree_node.spouse else ""
                }
            )
            
        response_data = dict()
        response_data["message"] = "success"
        response_data["data"] = tree_list
        
        return Response(response_data, status=status.HTTP_200_OK)
    


class GetFamilyTreeBio2ImageApiView(generics.ListAPIView):
    """
        returns an image from the url
    """   
    
    def get(self, request, *args, **kwargs):
        bio = get_object_or_404(TreeBio2, pk=self.kwargs["id"])

        profile_image = bio.image
        header, profile_image = profile_image.split(";base64,")
        profile_image = b64decode(profile_image + "=" * (-len(profile_image) % 4))
        return HttpResponse(profile_image, content_type="image/jpeg")

class GetFamilyTreeApiSearchApiView(generics.ListAPIView):
    """
        api to perform search on the tree bio
    """

    def get(self, request, *args, **kwargs):
        search_name = request.GET.get('name')
        print('search name: ')
        print(search_name)
        people = TreeBio2.objects.filter(Q(first_name__icontains=search_name) | Q(last_name__icontains=search_name))
        
        tree_list = []
        
        for person in people:
            tree_list.append(
                {
                    'full_name': (str(person.last_name) + " " + str(person.first_name)),
                    'parent' : person.parent.first_name if person.parent else 'Nil',
                    'gender' : person.gender,
                    'spouse' : person.spouse.first_name if person.spouse else 'Nil'
                }
            )

        response_data = dict()
        response_data["message"] = "success"
        response_data["data"] = tree_list
        
        return Response(response_data, status=status.HTTP_200_OK)
