
import React from 'react';

const BootScreen: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black text-white font-mono flex flex-col items-center justify-center">
            <pre className="text-left">
                {`
JJJJJJJJJJJ EEEEEEEEEEEEE NNNNNNNN        NNNNNNNN IIIIIIIIII FFFFFFFFFFFFF EEEEEEEEEEEEE RRRRRRRRRRRRRRR   
J:::::::::J E::::::::::::E N:::::::N       N::::::N I::::::::I F::::::::::::F E::::::::::::E R::::::::::::::::R  
J:::::::::J E::::::::::::E N::::::::N      N::::::N I::::::::I F::::::::::::F E::::::::::::E R::::::RRRRRR:::::R 
JJ:::::::JJ EE:::::::EE    N:::::::::N     N::::::N II::::::II FF::::::FF     EE:::::::EE    RR:::::R     R:::::R
  J:::::J   E:::::E      N::::::::::N    N::::::N   I::::I   F:::::F        E:::::E        R::::R     R:::::R
  J:::::J   E:::::E      N:::::::::::N   N::::::N   I::::I   F:::::F        E:::::E        R::::R     R:::::R
  J:::::J   E::::::EEEEEE  N:::::::N::::N  N::::::N   I::::I   F::::::FFFF    E::::::EEEEEE  R::::RRRRRR:::::R 
  J:::::J   E::::::::::E   N::::::N N::::N N::::::N   I::::I   F::::::::FF    E::::::::::E   R:::::::::::::RR  
  J:::::J   E::::::::::E   N::::::N  N::::N::::::N   I::::I   F::::::::FF    E::::::::::E   R:::::RRRRRR:::::R
J J:::::J   E::::::EEEEEE  N::::::N   N::::::::::N   I::::I   F::::::FFFF    E::::::EEEEEE  R:::::R     R:::::R
J J:::::J   E:::::E      N::::::N    N:::::::::N   I::::I   F:::::F        E:::::E        R:::::R     R:::::R
J J:::::J   E:::::E      N::::::N     N::::::::N   I::::I   F:::::F        E:::::E        R:::::R     R:::::R
J J:::::J EE:::::::EE    N::::::N      N::::::::N II::::::II FF::::::FF     EE:::::::EE    RR:::::R     R:::::R
 J::::JJ  E::::::::::::E N::::::N       N:::::::N I::::::::I F::::::::::::F E::::::::::::E R::::::R     R:::::R
 J::::J   E::::::::::::E N::::::N        N::::::N I::::::::I F::::::::::::F E::::::::::::E R::::::R     R:::::R
  JJJJ    EEEEEEEEEEEEE  NNNNNNNN         NNNNNNN IIIIIIIIII FFFFFFFFFFFFF  EEEEEEEEEEEEE  RRRRRRRR     RRRRRRR

NNNNNNNN        NNNNNNNN      AAAAA      DDDDDDDDDDDDD      OOOOOOOOO     LLLLLLLLLLL      SSSSSSSSSSSSSSS KKKKKKKKK    KKKKKKK IIIIIIIIII 
N:::::::N       N::::::N     A:::::A     D::::::::::::DDD  OO:::::::::OO   L:::::::::L    SS:::::::::::::::SK:::::K    K:::::K I::::::::I 
N::::::::N      N::::::N    A:::::A     D:::::::::::::::DDOO:::::::::::::O  L:::::::::L   S:::::SSSSSS::::::SK:::::K    K:::::K I::::::::I 
N:::::::::N     N::::::N   A:::::A     DDD:::::DDDDD:::::DO:::::OOOOO:::::O LL:::::::LL   S:::::S     SSSSSSSK:::::K   K::::::KII::::::II 
N::::::::::N    N::::::N  A:::::A      D:::::D     D:::::DO::::O   O:::::O   L:::::L     S:::::S            K::::::K  K:::::K   I::::I   
N:::::::::::N   N::::::N A:::::A       D:::::D     D:::::DO::::O   O:::::O   L:::::L     S:::::S            K:::::K K:::::K    I::::I   
N:::::::N::::N  N::::::NAAAAAAAAA      D:::::D     D:::::DO::::O   O:::::O   L:::::L      S::::SSSS         K::::::K:::::K     I::::I   
N::::::N N::::N N::::::NA::::::::A     D:::::D     D:::::DO::::O   O:::::O   L:::::L       SS::::::SSSSS    K:::::::::::K      I::::I   
N::::::N  N::::N::::::NA:::::A::::A    D:::::D     D:::::DO::::O   O:::::O   L:::::L         SSS::::::::SS  K:::::::::::K      I::::I   
N::::::N   N::::::::::A:::::A A:::::A   D:::::D     D:::::DO::::O   O:::::O   L:::::L            SSSSSS::::S K::::::K:::::K     I::::I   
N::::::N    N::::::::A:::::A   A:::::A  D:::::D     D:::::DO::::O   O:::::O   L:::::L                 S:::::SK:::::K K:::::K    I::::I   
N::::::N     N::::::A:::::A     A:::::A D:::::D     D:::::DO::::O   O:::::O   L:::::L                 S:::::SK::::::K  K:::::K   I::::I   
N::::::N      N::::A:::::AAAAAAAAA:::::ADDD:::::DDDDD:::::DO:::::OOOOO:::::O LL:::::::LLLLLL SSSSSSS     S:::::SK:::::K   K::::::KII::::::II 
N::::::N       N::A::::::::::::::::::::A D:::::::::::::::DDOO:::::::::::::O  L:::::::::::::L S::::::SSSSSS:::::SK:::::K    K:::::K I::::::::I 
N::::::N        NA:::::A         A:::::A D::::::::::::DDD  OO:::::::::OO   L:::::::::::::L S:::::::::::::::S K:::::K    K:::::K I::::::::I 
NNNNNNNN         AAAAAA           AAAAAA DDDDDDDDDDDDD      OOOOOOOOO     LLLLLLLLLLLLLLL  SSSSSSSSSSSSSSS  KKKKKKK    KKKKKKK IIIIIIIIII 
`}
            </pre>
            <p className="mt-8 text-xl animate-pulse">Booting jennyOS...</p>
        </div>
    );
};

export default BootScreen;
