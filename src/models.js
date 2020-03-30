const LeGascuel = {
  alphabet: "arndcqeghilkmfpstwyv",
  rootprob: {
    a: 0.079066,
    r: 0.055941,
    n: 0.041977,
    d: 0.053052,
    c: 0.012937,
    q: 0.040767,
    e: 0.071586,
    g: 0.057337,
    h: 0.022355,
    i: 0.062157,
    l: 0.099081,
    k: 0.0646,
    m: 0.022951,
    f: 0.042302,
    p: 0.04404,
    s: 0.061197,
    t: 0.053287,
    w: 0.012066,
    y: 0.034155,
    v: 0.069147
  },
  subrate: {
    a: {
      r: 0.023780059838785415,
      n: 0.011619956117479187,
      d: 0.020963119830342308,
      c: 0.03220118806861281,
      q: 0.039539556174800844,
      e: 0.07434507079592036,
      g: 0.11846019836138307,
      h: 0.008022247759976862,
      i: 0.009312956806827104,
      l: 0.039170273824718854,
      k: 0.034658964166178474,
      m: 0.025797653869038237,
      f: 0.010732029160376083,
      p: 0.051863602444553035,
      s: 0.28928853358549556,
      t: 0.11400726534071219,
      w: 0.002180525116577236,
      y: 0.007478523362328794,
      v: 0.17617706551848886
    },
    r: {
      a: 0.03361030748848622,
      n: 0.03156149298708182,
      d: 0.0065759888937963135,
      c: 0.006915466606697501,
      q: 0.11446965967381248,
      e: 0.02605508227143853,
      g: 0.022372375035829305,
      h: 0.0542465109781797,
      i: 0.007893357123778822,
      l: 0.029907316576601065,
      k: 0.40866276521168743,
      m: 0.011111304862018612,
      f: 0.002230239697097559,
      p: 0.014644711643512854,
      s: 0.05251611729460102,
      t: 0.03085239246806752,
      w: 0.007162441678846282,
      y: 0.010739667636638212,
      v: 0.011816289761745303
    },
    n: {
      a: 0.02188682970161301,
      r: 0.04206068750006776,
      d: 0.2692990903662267,
      c: 0.006840652148607381,
      q: 0.06913052504967644,
      e: 0.03877888487354867,
      g: 0.08243001678246818,
      h: 0.10080372861884797,
      i: 0.011903218096361284,
      l: 0.006779796292793331,
      k: 0.13857164444745146,
      m: 0.008514888572000574,
      f: 0.0037870757725932055,
      p: 0.007125079203173861,
      s: 0.24529878644522043,
      t: 0.10660987847848198,
      w: 0.0005475052578883485,
      y: 0.02090365438657137,
      v: 0.00578675766782108
    },
    d: {
      a: 0.031242366593264063,
      r: 0.006934090980695536,
      n: 0.213080900179128,
      c: 0.0008092846689063697,
      q: 0.021336816340862316,
      e: 0.37538660953025904,
      g: 0.048445384194250804,
      h: 0.020725574488358038,
      i: 0.000664456439064151,
      l: 0.0014937409050543244,
      k: 0.01827909938063158,
      m: 0.000586350479341114,
      f: 0.0007367295353865765,
      p: 0.01737179280267975,
      s: 0.07590089317330083,
      t: 0.02269273724013015,
      w: 0.00036065171364339603,
      y: 0.004614566452688203,
      v: 0.0026252966778291145
    },
    c: {
      a: 0.1968013554790863,
      r: 0.029903232391224,
      n: 0.022196031169675508,
      d: 0.003318711467482471,
      q: 0.003457357896917096,
      e: 0.0002504787011780186,
      g: 0.03263985441723913,
      h: 0.01431929801458755,
      i: 0.019929155723837376,
      l: 0.05885464007618758,
      k: 0.0008569811611698462,
      m: 0.020510791309596318,
      f: 0.04675419474710319,
      p: 0.003319813832345319,
      s: 0.17040121523162713,
      t: 0.0609324453560889,
      w: 0.008085741437284098,
      y: 0.03980863217105396,
      v: 0.1354787092264462
    },
    q: {
      a: 0.07668542076966182,
      r: 0.15707673441295028,
      n: 0.07118237913043068,
      d: 0.027766595052749227,
      c: 0.0010971579736653782,
      e: 0.2955484742427142,
      g: 0.01536392145975772,
      h: 0.10760559804682471,
      i: 0.004528373190980324,
      l: 0.057710257782915005,
      k: 0.20893479780526658,
      m: 0.03838702187572755,
      f: 0.0015167338936199874,
      p: 0.027493829516995943,
      s: 0.0748943889786494,
      t: 0.05755704323393889,
      w: 0.0028499690234478586,
      y: 0.008789286067109561,
      v: 0.014543785414732618
    },
    e: {
      a: 0.08211336528860726,
      r: 0.020360787826482037,
      n: 0.02273937991139263,
      d: 0.27819699953621246,
      c: 0.000045266434179029796,
      q: 0.1683097903144851,
      g: 0.02000178351715039,
      h: 0.009475832788308334,
      i: 0.0027513717750397237,
      l: 0.006903250867461523,
      k: 0.11674330196739328,
      m: 0.003987380637557869,
      f: 0.0007957406574504417,
      p: 0.018470719795310783,
      s: 0.03745080510204949,
      t: 0.032214297738304795,
      w: 0.0009393595587342143,
      y: 0.004099852067482321,
      v: 0.01694331778005055
    },
    g: {
      a: 0.1633530537635578,
      r: 0.02182766855397609,
      n: 0.06034785242474609,
      d: 0.044824886587603016,
      c: 0.007364560346649156,
      q: 0.010923853465475052,
      e: 0.024972490274320733,
      h: 0.006963205003841722,
      i: 0.000541075145187412,
      l: 0.004385411660825779,
      k: 0.019162631066242917,
      m: 0.0032025275241232332,
      f: 0.0037896561872497615,
      p: 0.008674137754803087,
      s: 0.1064818649997877,
      t: 0.006918551242919123,
      w: 0.003239603186611878,
      y: 0.0018675559302370587,
      v: 0.0053036289537274715
    },
    h: {
      a: 0.0283733858819204,
      r: 0.13574610022949454,
      n: 0.18928374485499355,
      d: 0.04918511195510492,
      c: 0.00828668120844192,
      q: 0.1962315998915188,
      e: 0.030343858912271992,
      g: 0.017859507282723005,
      i: 0.006767759214048915,
      l: 0.03629495138742272,
      k: 0.04504312621452824,
      m: 0.010155145972092586,
      f: 0.028855761859156177,
      p: 0.02240973426551097,
      s: 0.06058559194717776,
      t: 0.031133480593136052,
      w: 0.0072040330624839125,
      y: 0.18125439944921548,
      v: 0.008229368491544669
    },
    i: {
      a: 0.011846425066985085,
      r: 0.007103983314209358,
      n: 0.008038698554160555,
      d: 0.0005671242660558157,
      c: 0.004147939694632691,
      q: 0.002970030565772075,
      e: 0.003168745272262073,
      g: 0.0004991171645930569,
      h: 0.002434050183085791,
      l: 0.4106962146518183,
      k: 0.010275828156650554,
      m: 0.0980832751278198,
      f: 0.047070443599109967,
      p: 0.003447485429012548,
      s: 0.003923022520710688,
      t: 0.05508469333084793,
      w: 0.001347285725842141,
      y: 0.00794180046391689,
      v: 0.7363517061908176
    },
    l: {
      a: 0.03125762628783743,
      r: 0.016885630914218068,
      n: 0.0028723520047495045,
      d: 0.0007998096758706717,
      c: 0.007684646689735052,
      q: 0.02374495694468259,
      e: 0.004987597184102912,
      g: 0.002537785734871143,
      h: 0.008188993230446149,
      i: 0.2576441963051752,
      k: 0.008882474721909684,
      m: 0.1448745161684952,
      f: 0.10967574486452078,
      p: 0.010968571185215636,
      s: 0.011155385792571396,
      t: 0.016142504693035426,
      w: 0.007476458435205244,
      y: 0.010234448314410912,
      v: 0.1177393734477345
    },
    k: {
      a: 0.042420211466920536,
      r: 0.35388550694592885,
      n: 0.09004368295620233,
      d: 0.015011498147697625,
      c: 0.00017162175359217182,
      q: 0.13185208826822448,
      e: 0.12936820456095688,
      g: 0.017008169929491793,
      h: 0.015587292361080167,
      i: 0.009887223695556167,
      l: 0.0136235987294355,
      m: 0.01506967551813421,
      f: 0.0010117763566476882,
      p: 0.01718973196079554,
      s: 0.04581702316314235,
      t: 0.060579846280528996,
      w: 0.0006021640823381505,
      y: 0.004506124636296121,
      v: 0.012806126249830319
    },
    m: {
      a: 0.08887269839263551,
      r: 0.027082807079699497,
      n: 0.015573590588073203,
      d: 0.0013553686388394746,
      c: 0.011561505257820905,
      q: 0.06818542637827482,
      e: 0.01243695831642271,
      g: 0.008000667537390694,
      h: 0.009891433410576,
      i: 0.2656338343479541,
      l: 0.6254329631166691,
      k: 0.042416497689489345,
      f: 0.07609486305229383,
      p: 0.004397337445886918,
      s: 0.021232850694731777,
      t: 0.10765893666203162,
      w: 0.008400023644887627,
      y: 0.016438959647372443,
      v: 0.13129027991504044
    },
    f: {
      a: 0.02005906618113317,
      r: 0.0029493130087309004,
      n: 0.0037579802303944255,
      d: 0.0009239510025844798,
      c: 0.014298591495514964,
      q: 0.0014616966252471758,
      e: 0.0013466004137924288,
      g: 0.005136577864127927,
      h: 0.015249173948310633,
      i: 0.06916357531062074,
      l: 0.25688578499649156,
      k: 0.0015450984028991695,
      m: 0.04128535771153127,
      p: 0.004160182720791013,
      s: 0.022142174329943386,
      t: 0.008792383265295436,
      w: 0.02964753761389009,
      y: 0.26654151427584344,
      v: 0.04526923657205464
    },
    p: {
      a: 0.09311188898458286,
      r: 0.01860217561420873,
      n: 0.00679131357201701,
      d: 0.02092662015821449,
      c: 0.0009752141586978062,
      q: 0.025450521069922197,
      e: 0.030023727231315116,
      g: 0.011293120718600011,
      h: 0.011375331732640728,
      i: 0.00486569827000756,
      l: 0.024677043633114223,
      k: 0.025214729442947136,
      m: 0.0022916278773966996,
      f: 0.003996004756015019,
      s: 0.08188943095988824,
      t: 0.030451728655292103,
      w: 0.0011478473794115057,
      y: 0.0030607233046751683,
      v: 0.020502096301340908
    },
    s: {
      a: 0.37375830835614154,
      r: 0.04800568847455391,
      n: 0.16825836492983345,
      d: 0.06579888204699504,
      c: 0.0360226893712365,
      q: 0.049891654092399956,
      e: 0.043808574505863264,
      g: 0.0997655227134145,
      h: 0.022131655276878912,
      i: 0.0039845631455759966,
      l: 0.018061126847946248,
      k: 0.048364784161625506,
      m: 0.007963056298426214,
      f: 0.015305623780663514,
      p: 0.05893116557140837,
      t: 0.3448873495792334,
      w: 0.003002760346628398,
      y: 0.01368064385209428,
      v: 0.006801901885884378
    },
    t: {
      a: 0.1691613046602126,
      r: 0.03238901959307458,
      n: 0.08398226338302472,
      d: 0.022592660424932624,
      c: 0.014793158661056585,
      q: 0.0440337789989676,
      e: 0.043276835211107534,
      g: 0.007444385546479512,
      h: 0.013061139840102773,
      i: 0.06425393216667319,
      l: 0.03001511639782016,
      k: 0.07344114079835933,
      m: 0.046369288106485405,
      f: 0.006979852438465809,
      p: 0.025167379097698582,
      s: 0.3960829307748671,
      w: 0.0016991896143804365,
      y: 0.008396675459416025,
      v: 0.1513041306388495
    },
    w: {
      a: 0.014288529659149325,
      r: 0.03320687468559091,
      n: 0.0019047429314088518,
      d: 0.0015857197672973185,
      c: 0.008669421264225458,
      q: 0.009629097230142453,
      e: 0.005573097411863705,
      g: 0.015394424656950543,
      h: 0.013347104186294369,
      i: 0.006940430868653237,
      l: 0.061393583475764194,
      k: 0.003223918425248179,
      m: 0.015977866954567873,
      f: 0.10394083674314425,
      p: 0.004189557317195649,
      s: 0.015229564473116035,
      t: 0.007504120419483699,
      y: 0.10764993497064898,
      v: 0.013104010678099284
    },
    y: {
      a: 0.017312163026376472,
      r: 0.017590037981589174,
      n: 0.025690900312841648,
      d: 0.007167676165949777,
      c: 0.015078444573178895,
      q: 0.010490786856912765,
      e: 0.008592944227866767,
      g: 0.0031351209009516097,
      h: 0.11863393645695247,
      i: 0.014452890980403517,
      l: 0.029689338996930104,
      k: 0.00852278294553446,
      m: 0.011046422569663152,
      f: 0.33011972293651676,
      p: 0.003946545288768685,
      s: 0.02451220500121838,
      t: 0.013100092086250964,
      w: 0.038029691563631986,
      v: 0.017239196951026155
    },
    v: {
      a: 0.20144931612774003,
      r: 0.009559562462027188,
      n: 0.003512961178679125,
      d: 0.002014219551856049,
      c: 0.025347275532742342,
      q: 0.008574580242127707,
      e: 0.017540954005274254,
      g: 0.004397792721591278,
      h: 0.0026605280435663308,
      i: 0.661914660096644,
      l: 0.16870919722583744,
      k: 0.011964015152342671,
      m: 0.04357735280388293,
      f: 0.027694321452428235,
      p: 0.013057866879417094,
      s: 0.006019870561419386,
      t: 0.11660004352108369,
      w: 0.002286621152645031,
      y: 0.008515261281939902
    }
  }
};

module.exports = { LeGascuel };
