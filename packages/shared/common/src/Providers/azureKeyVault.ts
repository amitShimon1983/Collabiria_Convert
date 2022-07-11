import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

class AzureKeyVault {
  private static credential: DefaultAzureCredential;
  private static client: SecretClient;

  public static init(vaultUrl: string) {
    if (!this.client) {
      if (!vaultUrl) {
        throw new Error('must supply valid vault url');
      }
      this.credential = new DefaultAzureCredential();
      this.client = new SecretClient(vaultUrl, this.credential);
    }
  }

  public static async getSecretValue(secretName: string): Promise<string> {
    const { value } = await this.client.getSecret(secretName);
    return value || '';
  }

  public static async setSecretValue(secretName: string, secretValue: string): Promise<string> {
    const { value } = await this.client.setSecret(secretName, secretValue);
    return value || '';
  }
}
export default AzureKeyVault;
