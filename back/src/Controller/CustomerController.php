<?php

namespace App\Controller;

use App\Repository\CustomerRepository;
use App\Repository\OrderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/customers')]
class CustomerController extends AbstractController
{
    #[Route('/', name: 'list_customers')]
    public function list(CustomerRepository $customerRepository): JsonResponse
    {
        return $this->json([
            'data' => $customerRepository->findAll()
        ]);
    }

    #[Route('/{customerId}/orders', name: 'orders_by_customer_id', requirements: ["customerId" => "\d+"])]
    public function ordersByCustomer(OrderRepository $orderRepository, int $customerId): JsonResponse
    {
        return $this->json([
            'data' => $orderRepository->getOrdersWithCustomerInfo($customerId)
        ]);
    }
}