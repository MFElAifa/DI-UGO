<?php

namespace App\Command;

use App\Entity\Customer;
use App\Entity\Order;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


#[AsCommand(
    name: 'ugo:orders:import',
    description: 'Load Orders and Customers',
)]
class UgoOrdersImportCommand extends Command
{
    public function __construct(private EntityManagerInterface $em, private CustomerRepository $customerRepository)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('customer', InputArgument::REQUIRED, 'Path to the customer file')
            ->addArgument('order', InputArgument::REQUIRED, 'Path to the order file')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $fileCustomer = $input->getArgument('customer');
        $fileOrder = $input->getArgument('order');

        if ($fileCustomer) {
            $io->title('Load customers ...');
        
            $this->loadCustomers($io, $fileCustomer);

            $io->write("\nSuccess! Load customers...");
        }


        if ($fileOrder) {
            $io->title('Load orders ...');
        
            $this->loadOrders($io, $fileOrder);

            $io->write("\nSuccess! Load order...");
        }

        
        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }

    private function getDataFile($file)
    {
        $fileExtension = pathinfo($file, PATHINFO_EXTENSION);
        
        $encoders = [new CsvEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        $fileString = file_get_contents($file);
        
        $data = $serializer->decode($fileString,$fileExtension, [CsvEncoder::DELIMITER_KEY => ';', CsvEncoder::END_OF_LINE => '\r\n']);
        
        return $data;
    }

    public function loadCustomers($io, $fileCustomer)
    {
        if(!file_exists($fileCustomer)){
            $io->write(sprintf("\nFile Customer not found %s...",  $fileCustomer));
            return;
        }

        $ctp = 0;
        foreach($this->getDataFile($fileCustomer) as $row){
            if(!isset($row['title']) || empty($row['title'])){
                continue;
            }
            
            $customer = new Customer();
            
            $customer->setCivility($row['title']);
            if(isset($row['lastname'])){
                $customer->setLastname($row['lastname']);
            }
            if(isset($row['firstname'])){    
                $customer->setFirstname($row['firstname']);
            }
            if(isset($row['postal_code']) && !empty($row['postal_code'])){
                $customer->setPostalCode($row['postal_code']);
            }
            if(isset($row['city'])){
                $customer->setCity($row['city']);
            }    
            if(isset($row['email'])){
                $customer->setEmail($row['email']);
            }

            $this->em->persist($customer);
            $ctp++;
        }

        $this->em->flush();

        if($ctp > 1){
            $string = "\n{$ctp} customers has been created in the database.";
        }elseif($ctp == 1){
            $string = "\n{$ctp} customer has been created in the database.";
        }else{
            $string = "\nNo customer has been created in the database.";
        }

        $io->write($string);
    }


    public function loadOrders($io, $fileOrder)
    {
        if(!file_exists($fileOrder)){
            $io->write(sprintf("\nFile Order not found %s...",  $fileOrder));
            return;
        }

        $ctp = 0;
        foreach($this->getDataFile($fileOrder) as $row){
            if(count($row)<7){
                $io->write("\nNumber of columns not available!");
                break;
            }
            if(!isset($row['purchase_identifier']) || empty($row['purchase_identifier']) || 
                !isset($row['customer_id']) || empty($row['customer_id']) || 
                !isset($row['product_id']) || empty($row['product_id']) || 
                !isset($row['quantity']) || empty($row['quantity']) || 
                !isset($row['price']) || empty($row['price']) ||
                !isset($row['currency']) || empty($row['currency']) || 
                !isset($row['date']) || empty($row['date'])){
                continue;
            }

            $customer = $this->customerRepository->findOneBy(['id' => $row['customer_id']]);
            if(!$customer){
                $io->write("\nNo Customer identified !!!");
                continue;
            }
            $order = new Order();
            $order->setIdentifier($row['purchase_identifier'])
                ->setCustomer($customer)
                ->setProductId($row['product_id'])
                ->setQuantity($row['quantity'])
                ->setPrice($row['price'])
                ->setCurrency($row['currency'])
                ->setDate(new \DateTime($row['date']));

            $this->em->persist($order);
            $ctp++;
        }

        $this->em->flush();

        if($ctp > 1){
            $string = "\n{$ctp} orders has been created in the database.";
        }elseif($ctp == 1){
            $string = "\n{$ctp} order has been created in the database.";
        }else{
            $string = "\nNo order has been created in the database.";
        }

        $io->write($string);
    }
}
