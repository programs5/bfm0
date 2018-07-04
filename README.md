# bfm0 Реализация задания уровня Medium

в директории **encripter** 3 скрипта:
 * genkeys.js
 * gensig.js
 * verifysig.js

1. **node genkeys.js** -  создает на диске ключевую пару private.key и public.key
 
2. **node gensig.js \<file\> \<private key\>** - для указанного файла \<file\> вычисляется хешь и шифруется секретным ключом \<private key\>, полученная подпись сохраняется в файле с расширением dig.

3. **node verifysig.js \<file\> \<signature\> \<public key\>** - проверяет валидность подписи \<signature\> для указанного файла \<file\> с использованием открытого ключа \<public key\>.
