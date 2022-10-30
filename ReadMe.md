# Code And Conquer

This is an RTS game specifically for programmers. The only way to play the game
is by interacting with an API. The game servers provide a platform and a visual
representation for players and spectators to see what is happening. however all
gameplay is performed via an API. The idea is that players create programs that
interact with the API to see what is happening and to issue commands.

This game is turn based, the time between each turn can be adjusted but ideally,
turns will be very fast, the expectation would be that many games could be
played very rapidly by turning up the speed. Equally, games could be played much
more slowly by reducing it.

Fast games would be useful for doing things such as training AI and
participating in fully automated combat. Slower paced ones would be interesting
for players that perfer to be more directly involved in the course of action or
to make changes to their scripts in real-time.

## How do you play?

The gameserver exposes an interface that is used to interact with the game
itself. The games are played in real-time however ticks are typically slow, by
traditional RTS standsards. Lets say 20 seconds for example. Each tick, the
players are able to fetch information about the game state. They get a snapshot
of everything that is going on. They can see the map ,unit movements and
structures as well as information about when the next tick will occur. They have
until that tick happens to issue their commands.

Many commands can be issued at the same time but only one command can be issued
to a unit at a time. For example, a construction unit can only work on one
structure at a time. A combat unit can only move to one location at at time.

### Movement

On the subject of movement, players are responsible for movement. Units can only
be instructed to move a very limited distance (unit dependant). It is the
responsibility of the play to know that they want to move a unit to a
partiucular location and then to submit incremental movement commands for each
tick until they reach their destination.

In most cases, units cannot perform more than one action at a time. The only
exception that I can think of at the time of writing would be combat units
having the ability to fire their weapons while moving, as long as the target is
within range. There will always be special cases and exceptions to this. All
will be recorded in the documentation.

### Construction

Construction requires construction units and takes place over multiple ticks.
When the player wishes to construct a structure, they first need to move the
construction unit to within range of the build site, then instruct the
construction unity to work on that structure ove multiople ticks to ensure it's
completion.

Construction units are also able to perform repairs on structures, they are very
useful units to have around.

## Why make this?

Honestly, I really love the idea of this and have thought about it for years. I
really enjoy the game screeps but am not a big fan of the limitations and the
fact that the code runs on their servers. I appreciate that a big part of the
challenge in screeps is to work within the constraints, but I often found myself
wishing I could create something more sophisticated, especially a system that
could maintain state between turns.

One of the aspects behind this game that I really enjoy is that the limitations
exist only on the abilities and imagination of the programmer. I accept that it
could be viewed as un-fair that some players will inevitably have more compute
power than others, however I find it unlikely that even the most sophisticated
system built to play this game could consume more resources than are generally
available on a standard laptop or even Raspberry Pi. If ever a time comes where
difference of available compute becomes a problem, we can tackle it then.
