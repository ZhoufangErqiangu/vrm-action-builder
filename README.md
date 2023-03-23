# VRM Action Builder

## Target

Build a sequenceof vrm action, such as dance.

The action could be saved to file as json string.

The action file could be loaded by player app.

## Design

1. Action sequence is a array of vrm bone pos and time.
2. vrm bone pos is all vrm human bone rotation.
3. i think all bone must not change postion. but vrm human could change its position
4. the inital pos is static.
5. the pos between pre pos and next pos will be automatically calculated by time.
6. now pos use euler angle, i think maybe the quaternion is better. but quaternion is not easy to understand and use for user.

## Dependence

* three.js
* @pixiv/three-vrm
*
