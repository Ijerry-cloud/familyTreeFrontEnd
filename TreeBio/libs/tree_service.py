import json 
from mptt.templatetags.mptt_tags import cache_tree_children
from TreeBio.models import TreeBio2


def recursive_node_to_dict(bio):
    result = {
        "id": str(bio.id),
        "first_name": bio.first_name,
        "last_name": bio.last_name,
        "gender": bio.gender,
        "marital_status": bio.marital_status,
        "dob": str(bio.dob)
    }
    children = [recursive_node_to_dict(c) for c in bio.get_children()]
    if children:
        result['children'] = children
    else:
        result["children"] = []
    return result


# simulation
def check():
    
    root_nodes = cache_tree_children(TreeBio2.objects.filter(id=1))
    dicts = []
    for n in root_nodes:
        dicts.append(recursive_node_to_dict(n))

    print(json.dumps(dicts, indent=4))
