build and upload image to azure registry container
1. docker build -t {image_name} .
2. login to azure via azure cli - az acr login --name {container-registry}.azurecr.io -u {container-registry} -p {password}
3. create tag for docker image from stage 1 - docker tag {image_name} {container-registry}.azurecr.io/{repository}:{tag_name}
4. Push containar to azure - docker push {container-registry}.azurecr.io/{repository}:{current_branch}-{git rev-list HEAD --max-count=1 --abbrev-commit}
5. Show all images with its tags in repo -  az acr repository show-tags --repository harmonie/emailsteammate -n teammateapp