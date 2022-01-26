import requests
from os.path import isfile, join
from os import listdir

'''
This script post CSV files through Django API
'''
onlyfiles = [f for f in listdir("./CSVOLA/") if isfile(join("./CSVOLA/", f))]
print(onlyfiles)
for lake in onlyfiles:
    url = "https://open-lake.fr/api/uploadola/"

    payload={username: "", email: "guillaume@mail.com", password: "openlake+"}
    files=[
      ('file_uploaded',(lake,open('./CSVOLA/'+lake,'rb'),'text/csv'))
    ]
    headers = {
      'Content-Type': 'multipart/form-data'
    }

    response = requests.request("POST", url, data=payload, files=files)

    print(response.text)
