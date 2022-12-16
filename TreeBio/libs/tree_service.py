import json 
from mptt.templatetags.mptt_tags import cache_tree_children
from TreeBio.models import TreeBio2
from FamilyTreeApp.settings import UBASE_URL, env

# def recursive_node_to_dict(bio):
#     result = {
#         "id": str(bio.id),
#         "first_name": bio.first_name,
#         "last_name": bio.last_name,
#         "gender": bio.gender,
#         "marital_status": bio.marital_status,
#         "dob": str(bio.dob)
#     }
#     children = [recursive_node_to_dict(c) for c in bio.get_children()]
#     if children:
#         result['children'] = children
#     else:
#         result["children"] = []
#     return result

def recursive_node_to_dict(bio):
    result = {
        "id": str(bio.id),
        "first_name": bio.first_name,
        "last_name": bio.last_name,
        "gender": bio.gender,
        "marital_status": bio.marital_status,
        "dob": str(bio.dob),
        "image": treebio2_image_helper(bio),
        "bio": bio.bio
    }
    children = [recursive_node_to_dict(c) for c in bio.get_children()]
    
    # for c in bio.get_children():
    #     print(bio.get_descendant_count())
    #     children = recursive_node_to_dict(c)
    
    if children:
        result['children'] = children
    else:
        result["children"] = []
    return result


def treebio2_image_helper(treebio2):
    if treebio2.main_image:
        return "/%s/family/details/%s/image/" % (UBASE_URL[env], treebio2.id)
    return "http://cdn.onlinewebfonts.com/svg/img_264570.png"
    
    
def treebio_helper(treebio2):
    data = dict()
    
    
    children = [{"id": str(child.id), 
                     "first_name": child.first_name,
                     "last_name": child.last_name,
                     "gender": child.gender,
                     "marital_status": child.marital_status, 
                     "dob": str(child.dob),
                     "image": treebio2_image_helper(child)
                     } for child in treebio2.get_children()]
    
    
    if treebio2.spouse:
        spouse = treebio2.spouse
        spouse_data = {
            "id": str(spouse.id),
            "first_name": spouse.first_name,
            "last_name": spouse.last_name,
            "gender": spouse.gender,
            "marital_status": spouse.marital_status,
            "dob": spouse.dob,
            "bio": spouse.bio
        }
    else:
        # spouse_data = {
        #     "id": "",
        #     "first_name": "",
        #     "last_name": "",
        #     "gender": "",
        #     "marital_status": "",
        #     "dob": "",
        #     "bio": ""
        # }
        spouse_data = None
    
    if treebio2.parent:
        parent = treebio2.parent
        parent_data = {
            "id": str(parent.id),
            "first_name": parent.first_name,
            "last_name": parent.last_name,
            "gender": parent.gender,
            "marital_status": parent.marital_status,
            "dob": str(parent.dob),
            "image": treebio2_image_helper(parent),
        }
    else:
        parent_data = None    
    
    data["id"] = str(treebio2.id)
    data["first_name"] = treebio2.first_name
    data["last_name"] = treebio2.last_name
    data["gender"] = treebio2.gender
    data["marital_status"] = treebio2.marital_status
    data["dob"] = str(treebio2.dob)
    data["image"] = treebio2.image
    data["family_image"] = treebio2.family_image
    data["bio"] = treebio2.bio
    data["bio2"] = treebio2.bio2
    data["bio3"] = treebio2.bio3
    data["bio4"] = treebio2.bio4
    data["bio5"] = treebio2.bio5
    data["spouse"] = spouse_data
    data["parent"] = parent_data
    
    data["children"] = children
    
    return data

# simulation
def check():
    
    root_nodes = cache_tree_children(TreeBio2.objects.filter(id=1))
    dicts = []
    for n in root_nodes:
        dicts.append(recursive_node_to_dict(n))

    print(json.dumps(dicts, indent=4))
