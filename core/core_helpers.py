


def validate_fields(data, fields):
    """
        function to validate that certain
        fields are passed in the data property
        

        args:
            data|dict
            fields|list

        rtype:
            boolean, message
    """
    for field in fields:
        if not data.get(field):
            return False, f"{field} is required."

    return True, "Success"


def extract_user_info(user, token):
    """
        function to return generic user details

        args:
            user | DjangoAuthUser
            token | AuthToken

        rtype:
            user_data | dict
    """
    data = dict()
    data["first_name"] = user.first_name
    data["last_name"] = user.last_name
    data["email"] = user.email
    data["gender"] = user.profile.gender
    data["token"] = token.key

    return data
