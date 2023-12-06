<?php

namespace App\Controller;

use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/customers')]
class CustomerController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    #[Route('/', name: 'list_customers')]
    public function list(): JsonResponse
    {
        $repository = $this->entityManager->getRepository(Customer::class);
        
        return $this->json([
            'data' => $repository->findAll()
        ]);
    }

    #[Route('/{id}/orders', name: 'orders_by_customer_id', requirements:["customer_id"=>"\d+"])]
    public function ordersByCustomer(Customer $customer): JsonResponse
    {
        return $this->json([
            'data' => $customer->getOrders()
        ]);
    }
}
