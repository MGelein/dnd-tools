# DND Tools
Probably useless for most people that are not me. This contains some of the Node JS command line
utilities that I use when DM'in my DND games.


Regex to match magic table format;
`(\d+)\t(.+)` replace to > `else if(chance >= $1) return "$2" `

Regex to chance to inventory shop:
`if(size >= $3) inventory.push({name: "$1", price:"$2"});`