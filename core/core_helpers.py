from dateutil import parser


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


def check_date_chronology(start_date, end_date):
    """
        function t o ensure that an end date does 
        not come before start data

    Args:
        start_date (string): start date string in format (yyyy-mm-dd)
        end_date (string): end date string in format (yyyy-mm-dd)
    Return:
        (Boolean, start_date, end_date): 
        
        # returns a boolean indicating if the start date is greater than the end date,
        # start_date ([date object])
        # end_date ([date object])
        
    """
    start_date = parser.parse(start_date)
    end_date = parser.parse(end_date)
    
    result = start_date.timestamp() <= end_date.timestamp()
    
    return result, start_date, end_date