<?php 

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CustomerControllerTest extends WebTestCase
{
    public function testListCustomers()
    {
        $client = static::createClient();

        $client->request('GET', '/customers/');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/json');
    }

    public function testOrdersByCustomerId()
    {
        $client = static::createClient();

        $client->request('GET', '/customers/1/orders');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/json');
    }
}
