function main(config) {
if (!config || !config['proxy-groups']) return config;

  // 找到Hysteria2组并过滤其节点
  const hysteria2GroupIndex = config['proxy-groups'].findIndex(group => group.name === '♻️自动选择');
  if (hysteria2GroupIndex !== -1) {
    // 保留带有“自动最优”和“日本”字样的节点
    // const filteredProxies = config['proxy-groups'][hysteria2GroupIndex].proxies.filter(proxyName => proxyName.includes("自动最优") || proxyName.includes("日本"));
    const filteredProxies = config['proxy-groups'][hysteria2GroupIndex].proxies.filter(proxyName =>  proxyName.includes("日本"));
    // 更新Hysteria2组的proxies
    config['proxy-groups'][hysteria2GroupIndex].proxies = filteredProxies;
  }

  // 创建🎯 DMM组
  const dmmGroup = {
    name: "🎯 DMM",
    type: "select",
    proxies: ["♻️自动选择", "DIRECT"],
  };

  // 如果找到Hysteria2，保留并重新排序proxy-groups，否则只添加🎯 DMM组
  if (hysteria2GroupIndex !== -1) {
    const preservedHysteria2Group = config['proxy-groups'][hysteria2GroupIndex];
    config['proxy-groups'] = [dmmGroup, preservedHysteria2Group];
  } else {
    config['proxy-groups'] = [dmmGroup];
  }

  // 更新规则
  config.rules = [
    "DOMAIN-SUFFIX,dmm.co.jp,🎯 DMM",
    "DOMAIN-SUFFIX,unblockdmm.com,🎯 DMM",
    "DOMAIN-SUFFIX,dmm.com,🎯 DMM",
    "MATCH,DIRECT"
  ];

  return config;
}
