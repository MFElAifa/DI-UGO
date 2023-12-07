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
        $this->assertJson($client->getResponse()->getContent());
    }

    public function testOrdersByCustomer()
    {
        $client = static::createClient();

        $client->request('GET', '/customers/1/orders');
        $this->assertResponseIsSuccessful();
        $this->assertJson($client->getResponse()->getContent());
    }

    public function testOrdersByCustomerNotFound()
    {
        $client = static::createClient();

        $client->request('GET', '/customers/10000/orders');
        
        $data = json_decode($client->getResponse()->getContent(), true);
        
        $this->assertResponseIsSuccessful();
        $this->assertJson($client->getResponse()->getContent());
        $this->assertEquals(0, count($data['data']));
    }
}
