tsc
gcloud builds submit --tag gcr.io/gkemongodb/mask:$1
gcloud beta run deploy mask --image gcr.io/gkemongodb/mask:$1
