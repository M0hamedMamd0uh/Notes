import Icons from "./Icons/Icons";

interface INoteDetails {
  note: { [key: string]: string };
}

export default function Note({ note }: INoteDetails) {
  
  return (
    <>
      <div className="note" >
        <h5>{note.title}</h5>
        <p className="lead">{note.content}</p>
        <hr />
    
        <Icons note={note} />
      </div>
    </>
  );
}
