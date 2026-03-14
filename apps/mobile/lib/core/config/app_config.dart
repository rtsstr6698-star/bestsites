enum DistributionMode { directDistribution, playStoreCompliant }

class AppConfig {
  static const apiBaseUrl = 'http://10.0.2.2:3000';
  static const mode = DistributionMode.directDistribution;
}
