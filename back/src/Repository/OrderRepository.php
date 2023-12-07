<?php

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Order>
 *
 * @method Order|null find($id, $lockMode = null, $lockVersion = null)
 * @method Order|null findOneBy(array $criteria, array $orderBy = null)
 * @method Order[]    findAll()
 * @method Order[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
    }

    public function getOrdersWithCustomerInfo(int $customerId)
    {
        $orders = $this->createQueryBuilder('o')
            ->select('o', 'c.id as customerId', 'c.lastname')
            ->join('o.customer', 'c')
            ->where('c.id = :customerId')
            ->setParameter('customerId', $customerId)
            ->getQuery()
            ->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);

        $orders = array_map(function($order){
                $order = (array) $order;
                $row = $order[0];
                $row['customer'] = [
                    'customerId' => $order['customerId'],
                    'lastname' => $order['lastname'],
                ];
                return $row;
            }, $orders);

        return $orders;

    }
}
