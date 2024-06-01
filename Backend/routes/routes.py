from fastapi import APIRouter,Form
from model.model import Blog
from model.modelCompte import Compte
from config.config import blogsCollection,comptesCollection
from serializer.serializer import convertBlog,convertBlogs
from serializer.serializerCompte import convertCompte,convertComptes
from bson import ObjectId
from bson.decimal128 import Decimal128



endPoints = APIRouter()



# what is a middleware? 
# software that acts as a bridge between an operating system or database and applications, especially on a network.


@endPoints.get("/")
def home():
    return {
        "status" : 200,
        "message" : "My fastAPI is gonna be working"
    }   
    
    
    #*** Register User ***#
@endPoints.post("/api/register")
def newBlog(UserName: str = Form(...), Password: str = Form(...), Email: str = Form(...)):
    blog = Blog(UserName=UserName, Password=Password, Email=Email)
    blogsCollection.insert_one(dict(blog))
    return {
        "status": 200,
        "message": "Data inserted successfully."
    }
      
      
#     #*** Login User ***# 
# @endPoints.post("/api/login")
# def loginBlog(Password: str = Form(...), Email: str = Form(...)):
#     try:
#         login_users = blogsCollection.find({"$and" : [{ Password : Password }, {Email : Email }]})
#         # login_users = blogsCollection.find({Email : Email })
        
#         if login_users:
#             converted_blog = convertBlog(login_users)
#             return {
#                 "status" : 200,
#                 "data" : converted_blog,
#                 "message" : "verify has been successfully"
#             }
#         else:
#             return{
#                 "status": 404,
#                 "message":  "User not found"
#             } 
            
#     except Exception as e:
#             return {"status": 500, "message": f"Internal server error: {str(e)}"}           
  
  
  
  #*** Login User ***# 
@endPoints.post("/api/login")
def loginBlog(Password: str = Form(...), Email: str = Form(...)):
    try:
        # Utilisation de find_one pour obtenir un seul document
        login_user = blogsCollection.find_one({"$and": [{"Password": Password}, {"Email": Email}]})
        
        if login_user:
            converted_blog = convertBlog(login_user)
            return {
                "status": 200,
                "data": converted_blog,
                "message": "Verification successful"
            }
        else:
            return {
                "status": 404,
                "message": "User not found"
            } 
            
    except Exception as e:
        return {"status": 500, "message": f"Internal server error: {str(e)}"}






# Assuming you have established a connection to your MongoDB database
# and have a collection named 'comptes'

# @endPoints.get("/api/somme")
# # def loginBlog(Password: str = Form(...), Email: str = Form(...)):
# def sumSolde():
#     # ... (rest of your login logic)

#     # Aggregation pipeline to calculate total solde
#     pipeline = [
#         {
#             "$project": {
#                 "_id": 0,  # Exclude _id field from the output
#                 "total": {
#                     "$sum": {
#                         "$convert": {
#                             "input": "$soldeClient",
#                             "to": "decimal",  # Convert soldeClient to decimal
#                             "onError": "0",  # Set to 0 if conversion fails
#                             "onNull": "0"   # Set to 0 if soldeClient is null
#                         }
#                     }
#                 }
#             }
#         }
#     ]

#     # Execute aggregation and retrieve total
#     total_cursor = comptesCollection.aggregate(pipeline)
#     total_result = total_cursor.next()
#     total_solde = total_result.get("total", 0.0)  # Handle potential missing field

#     # Return the response with additional total information
#     return {
#         "status": 200,
#         "data": converted_blog,
#         "message": "Verification successful",
#         "total_solde": total_solde
#     }



  
      #*** All Data  ***#
@endPoints.get("/api/AllUser")
def AllCompte():
    blogAll = blogsCollection.find()
    AllUser = convertBlogs(blogAll)
    return {
        "status" : 200,
        "data" : AllUser,
        "message" : "All data"
    }
    
  
  
  
  
    #*** Create Data  ***#
@endPoints.post("/api/addCompte")        
def addCompte(nameClient : str = Form(...), soldeClient : str = Form(...), soldeStatus : str = Form(...)):
    comptes = Compte(nameClient = nameClient, soldeClient = soldeClient, soldeStatus = soldeStatus)
    comptesCollection.insert_one(dict(comptes))
    return {
            "status" : 200,
            "message" : "Data inserted successfully."
    }
    


#*** All Data  ***#
@endPoints.get("/api/AllCompte")
def AllCompte():
    compteAll = comptesCollection.find()
    AllData = convertComptes(compteAll)

    # Transformer les idClient en valeurs lisibles
    for index, compte in enumerate(AllData):
        # compte['idClient'] = str(index + 1)
        compte['numClient'] = str(index + 1)
        
    return {
        "status": 200,
        "data": AllData,
        "message": "All data"
    }
    
    
    #*** Edit Data  ***#
@endPoints.get("/api/edit/{id}")
def getBlogs(id: str):
    try:
        compte = comptesCollection.find_one({"_id": ObjectId(id)})
        if compte:
            dataCompte = convertCompte(compte)  # Use convertBlog for a single document
            return {
                "status": 200,
                "data": dataCompte,
                "message": "Data found successfully"
             }
        else:
            return {
                 "status": 404,
                 "message": "Blog not found"
            }
    except Exception as e:
        return {
            "status": 500,
            "message": f"Internal server error: {str(e)}"
            }
        
                       
    #*** Edit Data  ***#   
@endPoints.put("/api/update/{id}")
def updateCompte(id : str , nameClient : str = Form(...), soldeClient : str = Form(...), soldeStatus : str = Form(...)):
    try:
        update_comptes = comptesCollection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": {"nameClient": nameClient, "soldeClient": soldeClient, "soldeStatus": soldeStatus }}
        )
        
        if update_comptes:
            dataUpdate = convertCompte(update_comptes)
            return {
                "status" : 200,
                "data" : dataUpdate,
                "message" : "Compte updated successfully"
            }
        else:
            return {
                "status" : 404,
                "message" : "Compte not found"
            }
    except Exception as e:
        return {
            "status" : 500,
            "message" : f"Internal server error: {str(e)}"
        }        
        
        
    #*** Edit Data  ***#   
@endPoints.delete("/api/delete/{id}")
def deleteCompte(id : str):
    comptesCollection.find_one_and_delete({"_id": ObjectId(id)})
    return {
            "status": 200,
            "message": "Document delete successfully"
        }
 
      
      
      


##### Max-Solde ########

@endPoints.get("/api/max-solde")
def maxSolde():
    try:
        pipeline = [
            {
                "$group": {
                    "_id": None,
                    "max_solde": {"$max": {"$toDecimal": "$soldeClient"}}
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "max_solde": 1
                }
            }
        ]

        max_cursor = comptesCollection.aggregate(pipeline)
        max_result = list(max_cursor)

        if max_result:
            max_solde = max_result[0]["max_solde"].to_decimal()
        else:
            max_solde = Decimal128("0")  # Default value if no result found

        return {
            "status": 200,
            "max_solde": max_solde,
            "message": "Solde maximal récupéré avec succès"
        }
    except Exception as e:
        return {"status": 500, "message": f"Erreur lors de la récupération du solde maximal : {str(e)}"}




##### Min-Solde ########

@endPoints.get("/api/min-solde")
def minSolde():
    try:
        pipeline = [
            {
                "$group": {
                    "_id": None,
                    "min_solde": {"$min": {"$toDecimal": "$soldeClient"}}
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "min_solde": 1
                }
            }
        ]

        min_cursor = comptesCollection.aggregate(pipeline)
        min_result = list(min_cursor)

        if min_result:
            min_solde = min_result[0]["min_solde"].to_decimal()
        else:
            min_solde = Decimal128("0")  # Valeur par défaut si aucun résultat trouvé

        return {
            "status": 200,
            "min_solde": min_solde,
            "message": "Solde minimal récupéré avec succès"
        }
    except Exception as e:
        return {"status": 500, "message": f"Erreur lors de la récupération du solde minimal : {str(e)}"}
      
      
      


##### Somme-Solde ########

@endPoints.get("/api/sum-solde")
def sumSolde():
    try:
        pipeline = [
            {
                "$group": {
                    "_id": None,
                    "total": {"$sum": {"$toDecimal": "$soldeClient"}}
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "total": 1
                }
            }
        ]

        total_cursor = comptesCollection.aggregate(pipeline)
        total_result = list(total_cursor)

        if total_result:
            total_solde = total_result[0]["total"].to_decimal()
        else:
            total_solde = Decimal128("0")  # Default value if no result found

        return {
            "status": 200,
            "total_solde": total_solde,
            "message": "Somme des soldes calculée avec succès"
        }
    except Exception as e:
        return {"status": 500, "message": f"Erreur lors du calcul de la somme : {str(e)}"}




##### Max-Solde ########

@endPoints.get("/api/max-solde")
def maxSolde():
    try:
        pipeline = [
            {
                "$group": {
                    "_id": None,
                    "max_solde": {"$max": {"$toDecimal": "$soldeClient"}}
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "max_solde": 1
                }
            }
        ]

        max_cursor = comptesCollection.aggregate(pipeline)
        max_result = list(max_cursor)

        if max_result:
            max_solde = max_result[0]["max_solde"].to_decimal()
        else:
            max_solde = Decimal128("0")  # Default value if no result found

        return {
            "status": 200,
            "max_solde": max_solde,
            "message": "Solde maximal récupéré avec succès"
        }
    except Exception as e:
        return {"status": 500, "message": f"Erreur lors de la récupération du solde maximal : {str(e)}"}

   