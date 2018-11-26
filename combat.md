## Combat Tracker
These are some notes we might need in the development of a command line combat tracker.

#### Things we need to track
What do we need to track?
- Health of enemies
- Initiative of all parties
- Attacks of monsters

So, we have a list of the participants in combat, in order of initiative, the person who is currently acting is in bold. 

#### Things we can do
- Enter initiative for participants (those wo don't have one yet).
- Do damage to enemies (player's turn).
- See what enemies can do (enemy's turn).
- Set markers to participants (concentration, _dis_advantage).
- End a combat early

#### Things that should be in the JSON
- List of enemy names (with their associated prototype).
- List of enemy types (prototypes with attacks etc.).
- List of allies.