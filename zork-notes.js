/* 182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.
>_
chervon code????

And waits for input

And if the user types "wrong code"

Then the game should output

Sorry, I don't know how to " ".

Read the sign
Given the player is in the room "182 Main St."

When the player types "read sign"

Then the game displays the text

The sign says "Welcome to Burlington Code Academy! Come on 
up to the third floor. If the door is locked, use the code
12345."

Read the sign
Given the player is in the room "182 Main St."

When the player types "read sign"

Then the game displays the text

The sign says "Welcome to Burlington Code Academy! Come on 
up to the third floor. If the door is locked, use the code
12345."

Blocked
Given the player is in the room 182 Main St.

When the player types open door

Then the game displays the text

The door is locked. There is a keypad on the door handle.


Speak friend and enter
Given the player is in the room 182 Main St.

When the player types enter code 12345 or key in 12345

Then the game displays the text

Success! The door opens. You enter the foyer and the door
shuts behind you.
And the player enters room 182 Main St. - Foyer

Unauthorized Access
Given the player is in the room 182 Main St.

When the player types enter code 54321 (or any code that is not 12345)

Then the game displays the text

Bzzzzt! The door is still locked.
And the player remains in room 182 Main St

Foyer
Given the player is in 182 Main St. - Foyer

Then the game displays the text

You are in a foyer. Or maybe it's an antechamber. Or a 
vestibule. Or an entryway. Or an atrium. Or a narthex.
But let's forget all that fancy flatlander vocabulary,
and just call it a foyer. In Vermont, this is pronounced
"FO-ee-yurr".
A copy of Seven Days lies in a corner.

Inventory
Given the player is in 182 Main St. - Foyer

And the player has not yet picked up Seven Days

When the player types take paper or take seven days

Then the game displays the text

You pick up the paper and leaf through it looking for comics 
and ignoring the articles, just like everybody else does.
And the paper is added to the player's inventory

Display Inventory
Given the paper is in the player's inventory

When the player types i or inventory or take inventory

Then the game displays the text

You are carrying:
A copy of Seven Days, Vermont's Alt-Weekly

Drop Inventory
Given the copy of Seven Days is in the player's inventory

When the player types drop paper or drop seven days

Then the copy of Seven Days is removed from the player's inventory

And the copy of Seven Days is added to the current room's inventory


More rooms and more stories, e.g.
read paper or read seven days

go up or go upstairs

Alex C speaks gibberish until you get him a cup of coffee from Muddy's

then you can attend lecture or sit down or pair up or something
After class you are hungry (status) which makes your stomach growl before every prompt

buying and eating a slice of pizza at Mr. Mike's removes the status
xyzzy

Please write stories for each of these features before implementing them.