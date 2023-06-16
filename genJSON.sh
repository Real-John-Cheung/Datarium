cd ./images/Omm/JPEG 
ls -1 | jq -Rn '[inputs | { name: "\(.)", editions: 20, ava:20, options:[{option:"30cm x 30cm Print Only", priceInGBP:60, optionCH:"30cm x 30cm 僅印刷品"},{option:"30cm x 30cm Framed", priceInGBP:100, optionCH:"30cm x 30cm 裝框"}] }] ' > ../../../json/Omm.json

cd ../../OmmI/JPEG
ls -1 | jq -Rn '[inputs | { name: "\(.)", editions: 20, ava:20, options:[{option:"30cm x 30cm Print Only", priceInGBP:60, optionCH:"30cm x 30cm 僅印刷品"},{option:"30cm x 30cm Framed", priceInGBP:100, optionCH:"30cm x 30cm 裝框"}] }] ' > ../../../json/OmmI.json


cd ../../Platy/JPEG
ls -1 | jq -Rn ' [inputs | { name: "\(.)", editions: 20, ava:20, options:[{option:"30cm x 30cm Print Only", priceInGBP:60, optionCH:"30cm x 30cm 僅印刷品"},{option:"30cm x 30cm Framed", priceInGBP:100, optionCH:"30cm x 30cm 裝框"}] }] ' > ../../../json/Platy.json

cd ../../PlatyPoi/JPEG

ls -1 | jq -Rn '[inputs | { name: "\(.)", editions: 20, ava:20, options:[{option:"30cm x 30cm Print Only", priceInGBP:60, optionCH:"30cm x 30cm 僅印刷品"},{option:"30cm x 30cm Framed", priceInGBP:100, optionCH:"30cm x 30cm 裝框"}] }] ' > ../../../json/PlatyPoi.json
