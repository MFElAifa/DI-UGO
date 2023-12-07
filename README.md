<h1>DI-UGO (PHP8, SF6.4, React JS)</h1>

<h2>back : This section corresponds to the backend part of the application developed in Symfony 6.4.</h2>

## —— Install dependencies & start server
```
composer install
php bin/console doctrine:migrations:migrate # Create Schema Database
php bin/console ugo:orders:import <customerFile> <orderFile> #Command to loading customers and orders.
php bin/phpunit # Launch Test
php -S localhost:8000 -t public # Start Server
```


<h2>my-app : This section represents the frontend part developed in React JS.</h2>

## —— Install dependencies & start server
```
npm install --legacy-peer-deps
npm start # Start Server
npm test # Launch Test 
```