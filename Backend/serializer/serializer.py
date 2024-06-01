# About user
def convertBlog(blog)->dict:
    return {
        "UserID":str(blog["_id"]),
        "UserName":blog["UserName"],
        "Password":blog["Password"],
        "Email":blog["Email"],
    }
def convertBlogs(blog)->list:
     return [convertBlog(blog) for blog in blog]
 
