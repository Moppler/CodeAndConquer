# Development Diary

This is more of a change log than a development diary as i'll only add new
entries with each version of the codebase. Despite that, i'll try to add a lot
of detail here and explain why I am doing things in a certain way. If you are
intersted in chatting with me about this project, I would be more than happy to
do so, please feel free to get in touch!

## 0.1.0 (30th October 2022)

### TL;DR

- Created initial project
- Created core game object
- Added game ticks
- Added structures
- Added units
- Added player commands

### More detail

I'll be completely honest, this is pretty rushed. Most of this was written in a
few hours. It just wanted to get as quickly as possible to the point where I had
a functional proof of concept, which I think this is. It's a server with the
ability to create multiple games. Players can join those games. Once there are
enough players in a game, it automatically schedules to start. Once a game
starts, each player receives a command centre structure that is built on their
spawn point.

As soon as the command centre is created, players can begin playing. Playing is
probably a bit generous of a term as there isn't really much to be done yet.
There are two options that a player has at the moment. They can spawn a
construction unit and they can direct that unit to move to different parts of
the map.

Players issue commands via the API by sending in instructions that they want the
server to perform on the next tick. at the end of each tick, the commands are
reset so players can send in new commands. It is not possible to issue more than
one command to a structure or unit per tick. It is possible however to issue
multiple commands.

This keeps the gameplay loop simple and easy to understand, makes the
development much simpler and still gives the player a lot of power. This does
remove the option for a player to issue concurrent commands in the future, such
as move and shoot at the same time, but I feel like that is a reasonable trade
off. It's also still fair as all players have the same issues to contend with.

At the moment, things are still ver simple. There is absolutely NO validation of
inputs. There are no mechanisms preventing players from controlling eac others
units. There is no logging to help keep track of the game play. There is no
visual indicator about what is happening or has happened. These are all features
that I would like to add in the future.

This initial version is enough for me to demonstrate the concept and enough for
me to start working on an AI to play the game. I'd really like to allow players
to compete both with each other as well as a computer player and so I will enjoy
programming the computer player.

I am very confident that this game has a lot of potential to be really fun for
programmers and I am confident that I can make something that is interesting to
follow along with as well as play. One thing I am really excited to do is look
at some kind of live visual representation of what is happening in game, even
better with some kind of replay function to view historical battles.

For now though, I am focusing on keeping things simple and iterating quickly. My
next moves are to create a simple AI that can perform simple gameplay. I would
also like to program in enough gameplay to create an actual game win scenario,
such as a combat unit with the ability to capture the opponents command centre
or perhaps destrpoy it?

Thanks for reading this and I hope you continue to follow along as I continue to
work on this.
