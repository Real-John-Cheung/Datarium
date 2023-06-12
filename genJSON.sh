cd ./images/Omm/JPEG 
ls -1 | jq -Rn '[inputs | { name: "\(.)", editions: 10, ava:9 }] ' > ../../../Omm.json

cd ../../OmmI/JPEG
ls -1 | jq -Rn ' [inputs | { name: "\(.)", editions: 10, ava:9 }] ' > ../../../OmmI.json


cd ../../Platy/JPEG
ls -1 | jq -Rn ' [inputs | { name: "\(.)", editions: 10, ava:9 }] ' > ../../../Platy.json

cd ../../PlatyPoi/JPEG

ls -1 | jq -Rn ' [inputs | { name: "\(.)", editions: 10, ava:9 }] ' > ../../../PlatyPoi.json
