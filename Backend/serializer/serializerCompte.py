 
#  About Compte
def convertCompte(compte)->dict:
    return {
        "idClient":str(compte["_id"]),
        "nameClient":compte["nameClient"],
        "soldeClient":compte["soldeClient"],
        "soldeStatus":compte["soldeStatus"],
    }
def convertComptes(compte)->list:
     return [convertCompte(compte) for compte in compte]