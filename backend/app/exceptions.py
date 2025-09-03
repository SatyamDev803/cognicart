class SaleNotFoundException(Exception):
    # Custom exception raised when a sale is not found in the database
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)

class ProductNotFoundException(Exception):
    # Custom exception raised when a product is not found in the database
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)