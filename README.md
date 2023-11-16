# Threlte + Nakama Starter for Realtime Multiplayer Games

> Under development

This is a starter project for realtime multiplayer games using [Threlte](https://threlte.xyz) and [Nakama](https://heroiclabs.com/nakama/).

## Features

- Build setup for Nakama with TypeScript server runtime using Rollup as the bundler
- Device or Google Authentication
- Session and socket management
- Realtime Matches
  - `AbstractMatchManager` abstract class to easily manage realtime matches with full type safety
    - `TimeTrialMatchManager` example implementation
    - `new TimeTrialMatchManager('matchId')` to create a match manager
    - `manager.join()` to join the match
    - `manager.send('MessageType', { foo: 'bar' })` to send a message to the server
  - Shared types between server and client
  - Utilities to make processing incoming messages easier (client and server)
