## Encounter Generation
Generate a basic combat encounter using a single input monster type, and party description.

Example input:
```
encounter -p 3 -l 15 -m ogre
```

### Linking Monsters
Every monster should have some 'related' monsters in its file. For every jump away from the input monster the chance 
that monster gets picked gets smaller.