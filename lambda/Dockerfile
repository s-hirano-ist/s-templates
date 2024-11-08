FROM public.ecr.aws/lambda/provided:al2

RUN yum -y install wget tar gzip unzip jq
RUN wget https://github.com/jgm/pandoc/releases/download/3.1.3/pandoc-3.1.3-linux-amd64.tar.gz
RUN tar xzf pandoc-3.1.3-linux-amd64.tar.gz

COPY bootstrap ${LAMBDA_RUNTIME_DIR}
COPY reference.docx ${LAMBDA_TASK_ROOT}

CMD [ "function.handler" ]
