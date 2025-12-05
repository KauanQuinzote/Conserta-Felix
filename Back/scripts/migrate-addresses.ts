import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Script para migrar endereços de string para JSON
 * Converte formato: "Rua X, 123, Bairro Y, Cidade - Estado, CEP, País"
 * Para: { street, number, neighborhood, city, state, zipCode, country }
 */
async function migrateAddresses() {
  try {
    console.log('🔄 Iniciando migração de endereços...\n');

    // Buscar todos os clientes
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        address: true,
        user: {
          select: {
            name: true
          }
        }
      }
    });

    console.log(`📊 Total de clientes encontrados: ${clients.length}\n`);

    let migratedCount = 0;
    let skippedCount = 0;

    for (const client of clients) {
      // Verificar se já está em formato JSON
      try {
        const parsed = JSON.parse(client.address);
        if (typeof parsed === 'object' && parsed.street) {
          console.log(`⏭️  Cliente ${client.user.name} (${client.id}) - Endereço já está em formato JSON, pulando...`);
          skippedCount++;
          continue;
        }
      } catch (e) {
        // Não é JSON, precisa migrar
      }

      // Parsear endereço do formato string
      // Formato: "Rua X, 123, Bairro Y, Cidade - Estado, CEP, País"
      const addressParts = client.address.split(',').map(part => part.trim());

      if (addressParts.length < 4) {
        console.log(`⚠️  Cliente ${client.user.name} (${client.id}) - Formato de endereço inválido, pulando...`);
        skippedCount++;
        continue;
      }

      const street = addressParts[0];
      const number = addressParts[1];
      const neighborhood = addressParts[2];
      
      // Processar "Cidade - Estado"
      const cityStateParts = addressParts[3].split('-').map(part => part.trim());
      const city = cityStateParts[0];
      const state = cityStateParts[1] || '';

      const zipCode = addressParts[4] || '';
      const country = addressParts[5] || 'Brasil';

      const addressObject = {
        street,
        number,
        neighborhood,
        city,
        state,
        zipCode,
        country
      };

      // Atualizar no banco
      await prisma.client.update({
        where: { id: client.id },
        data: {
          address: JSON.stringify(addressObject)
        }
      });

      console.log(`✅ Cliente ${client.user.name} (${client.id}) - Endereço migrado com sucesso!`);
      migratedCount++;
    }

    console.log(`\n✨ Migração concluída!`);
    console.log(`   - Migrados: ${migratedCount}`);
    console.log(`   - Pulados: ${skippedCount}`);
    console.log(`   - Total: ${clients.length}`);

  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar migração
migrateAddresses()
  .then(() => {
    console.log('\n🎉 Script finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Erro fatal:', error);
    process.exit(1);
  });
