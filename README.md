#
# bfm0 Реализация задания уровня Medium
#

в директории encripter созданы 3 скрипта:
 - genkeys.js
 - gensig.js
 - verifysig.js
 
1. "node genkeys.js" -  создает на диске ключевую пару private.key и public.key
 
2. "node gensig.js <file> <private key>" - для указанного файла высчитывает хешь и шифрует его секретным ключом, сохраняет полученную подпись в файле с расширением dig.

3. "node verifysig.js <file> <signature> <public key>" - проверяет совпадение подписи для указанного файла с использованием открытого ключа.