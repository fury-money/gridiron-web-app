import { TEST_CONTRACT_ADDRESS as FURYA_TEST_CONTRACT_ADDRESS } from '@libs/app-fns/test-env';
import { CW20Addr, HumanAddr } from '@libs/types';

export const TEST_CONTRACT_ADDRESS = {
  airdrop: 'furya179dgjvznfk5x2fsqa3un492l5zu9p9utdncrn7' as HumanAddr,
  collector: 'furya1qvdf64vhtpjfznysr8uqm28exrekaju7j3mpcw' as HumanAddr,
  community: 'furya108u9rg6nhltna8ce3teve8lsnahehljr2273m2' as HumanAddr,
  clusterFactory: 'furya1q2ft2we9p5p5d624hsamx9k3qc2qkzw4wyg4c6' as HumanAddr,
  gov: 'furya1yzsxytzktj7dsrhyajx34jzz8cxw0vws8cgvkg' as HumanAddr,
  incentives: 'furya14j87dwkfmjs48hd3skuxnw2fm0z9x90kruspsn' as HumanAddr,
  incentivesCustody:
    'furya16stw0qmz8mj5uzg672x2t8lfdjqgva7xv3fs5q' as HumanAddr,
  staking: 'furya1n9vdcgkd3dnqdq50kncd7e3vqj3uthg434knrd' as HumanAddr,
  oracle: 'furya18syqrhamudfnks205wv8rrudp0yey7jk5kte97' as HumanAddr,
  terraswap: {
    factory: FURYA_TEST_CONTRACT_ADDRESS.terraswap.factory,
    nebUstPair: 'furya17ld5j4588k8w9hhtrllyj0537eqndkhr679m72' as HumanAddr,
  },
  cw20: {
    NEB: 'furya1nknarneeatpm7amzw4rhxhcaqyt3ecx6y7k5yq' as CW20Addr,
    aUST: 'furya1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl' as CW20Addr,
  },
  anchor: {
    proxy: 'furya1jqx7xrt6fgf9qa48e9h0cvg6yvhtn4mcfsgqsz' as HumanAddr,
    market: 'furya15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal' as HumanAddr,
  },
};

export * from '@libs/app-fns/test-env';
