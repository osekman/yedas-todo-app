# yedas-todo-app
Uygulamayı çalıştırmak için localde dockerın kurulu olması gerekir. Kurulu ise mongodb imajı indirilmiş olmalı.

Mevcut imaj üzerinden aşağıdaki komut ile bir mongodb container çalıştırılır.

```javascript

docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1234 -p 27017:27017 mongo

```

Mevcut proje github reposundan klonlanır ve ana dizine gidilir. Aşağıdaki kod çalıştırılır.


```javascript

npm run local-dev-win

```


Sistem http://localhost:3000 adresinde ayağa kalkar, tarayıcıdan kontrol edilebilir.

Default olarak **user1** ve **admin** adında iki kullanıcı oluşturacak sistem başlangıcında. İsimlerinden de anlaşılacağı gibi user1 yetkisiz, admin yetkili, user Kullanıcılar sayfasına erişemez, sadece adminler sayfaya erişip kullanıcı işlemlerini yapabilir.


Bu proje workshop tarzında olduğu için çok özenmedim temel işlemleri yaptım, dosya yapılarını basit tutup kod tekrarına girdim.
Production projelerinde elbette daha özenli olunmalı.
Kullanıcı kısıtlamaları, input typeler gerektiği şekilde olmalı.


**Not:**

İnsan Kaynaklarından mailime dönüş gelmediği için birçok noktada devam edip etmeme konusunda tereddütte kalarak ilerledim. Projeyi minimal isteklere göre ayarlayarak bıraktım. Bir özellik eklemeyi es geçtim. Görevleri kategorilerle bağlarken manuel yazılmasını bekledim kullanıcıdan. Bu da bahsettiğim tereddütler sonucu böyle kaldı.

Projenin hiç değerlendirilmeme ihtimali beni yordu açıkçası ama yine de birgün geriye dönüp baktığımda "keşke..." dememek için devam ettim.
