import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteButton from "./DeleteButton";

export default function NewCard(props: {
  id: number;
  title: string;
  content: string;
}) {
  let cardContent = props.content;
  if (cardContent.length > 230) {
    cardContent = cardContent.substring(0, 230) + "...";
  }
  return (
    <div className=" m-3 mb-10 flex hover:cursor-pointer hover:scale-105 duration-500 flex-row justify-stretch w-[300px] h-[300px] shadow-lg rounded-xl overflow-hidden shadow-purple-400">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Card Title: {props.title}</CardTitle>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CardDescription>
              <DeleteButton id={props.id} />
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="max-full ">
          <p> {cardContent}</p>
        </CardContent>
      </Card>
    </div>
  );
}
