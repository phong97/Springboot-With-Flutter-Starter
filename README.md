# Springboot-With-Flutter-Starter
Springboot With Flutter Starter

## 1. Build flutter project
> flutter build web

## 2. Copy build folder to Springboot project
- Copy /build/web/index.html to src/main/resources/templates
- Copy /build/web/* (except the file index.html) to /src/main/resources/static
- Remove /static in index.html file
