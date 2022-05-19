import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {
  public type Note = {
    title: Text;
    content: Text;
  };

  stable var notes: List.List<Note> =  List.nil<Note>();

  public query func getNotes(): async [Note]{
    return List.toArray(notes);
  };

  public func deleteNote(index: Nat){
    let left_part = List.take(notes, index);
    let right_part = List.drop(notes , index+1);
    notes := List.append(left_part,right_part)
  };

  public func creatNeote(titleText:Text, contentText: Text){

    let new_note: Note = { 
      title =titleText;
      content=contentText
      };

    notes := List.push(new_note, notes);
    Debug.print(debug_show(notes));
  }

}