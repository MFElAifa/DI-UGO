<?php 
namespace App\Tests\Command;

use App\Command\UgoOrdersImportCommand;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Console\Tester\CommandTester;
use App\Repository\CustomerRepository;

class UgoOrdersImportCommandTest extends KernelTestCase
{
    private ?EntityManagerInterface $entityManager;
    private ?CustomerRepository $customerRepository;

    protected function setUp(): void
    {
        self::bootKernel();

        // Récupérer le conteneur du kernel
        $container = self::getContainer();

        // Obtenez les services nécessaires pour les tests
        $this->entityManager = $container->get(EntityManagerInterface::class);
        $this->customerRepository = $container->get(CustomerRepository::class);

        parent::setUp();
    }

    public function testCommandArguments()
    {
        $application = new Application(self::$kernel);
        $application->add(self::getContainer()->get(UgoOrdersImportCommand::class));

        $command = $application->find('ugo:orders:import');
        $definition = $command->getDefinition();

        $this->assertTrue($definition->hasArgument('customerFile'));
        $this->assertTrue($definition->hasArgument('orderFile'));
    }

    public function testExecutionWithValidFiles()
    {
        $command = new UgoOrdersImportCommand($this->entityManager, $this->customerRepository);
        $application = new Application(self::$kernel);
        $application->add($command);

        $command = $application->find('ugo:orders:import');
        $tester = new CommandTester($command);

        $tester->execute([
            'customerFile' => 'csv/customers.csv',
            'orderFile' => 'csv/purchases.csv',
        ]);
        
        $this->assertSame(0, $tester->getStatusCode());
    }

    public function testExecutionWithInvalidCustomerFile()
    {
        $command = new UgoOrdersImportCommand($this->entityManager, $this->customerRepository);
        $application = new Application(self::$kernel);
        $application->add($command);

        $command = $application->find('ugo:orders:import');
        $tester = new CommandTester($command);

        $tester->execute([
            'customerFile' => null,
            'orderFile' => 'csv/purchases.csv',
        ]);

        $this->assertStringNotContainsString('Load customers', $tester->getDisplay());
        $this->assertSame(0, $tester->getStatusCode());
    }

    public function testExecutionWithInvalidOrderFile()
    {
        $command = new UgoOrdersImportCommand($this->entityManager, $this->customerRepository);
        $application = new Application(self::$kernel);
        $application->add($command);

        $command = $application->find('ugo:orders:import');
        $tester = new CommandTester($command);

        $tester->execute([
            'customerFile' => 'csv/customers.csv',
            'orderFile' => 'csv/invalid_purchases.csv',
        ]);

        $this->assertStringContainsString('Number of columns not available!', $tester->getDisplay());
        $this->assertSame(0, $tester->getStatusCode());
    }


    public function testExecutionWithInvalidCustomerFileAndInvalidOrderFile()
    {
        $command = new UgoOrdersImportCommand($this->entityManager, $this->customerRepository);
        $application = new Application(self::$kernel);
        $application->add($command);

        $command = $application->find('ugo:orders:import');
        $tester = new CommandTester($command);

        $tester->execute([
            'customerFile' => null,
            'orderFile' => 'csv/invalid_purchases.csv',
        ]);

        $this->assertStringNotContainsString('Load customers', $tester->getDisplay());
        $this->assertStringContainsString('Number of columns not available!', $tester->getDisplay());
        $this->assertSame(0, $tester->getStatusCode());
    }
}
