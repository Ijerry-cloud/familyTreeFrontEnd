from rest_framework.authentication import TokenAuthentication

class CustomTokenAuthentication(TokenAuthentication):
    
    def __init__(self) -> None:
        super().__init__()
        self.keyword = "Bearer"