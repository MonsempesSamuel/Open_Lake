import requests
from os.path import isfile, join
from os import listdir



'''
This script post CSV files through Django API
'''
onlyfiles = [f for f in listdir("./CSVOLA/") if isfile(join("./CSVOLA/", f))]
print(onlyfiles)
for lake in onlyfiles:
    url = "http://127.0.0.1:8000/api/uploadola/"

    payload={}
    files=[
      ('file_uploaded',(lake,open('./CSVOLA/'+lake,'rb'),'text/csv'))
    ]
    headers = {
      'Content-Type': 'multipart/form-data'
    }

    response = requests.request("POST", url, data=payload, files=files)

    print(response.text)
