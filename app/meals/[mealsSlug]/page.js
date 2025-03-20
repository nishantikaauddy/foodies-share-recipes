import Image from "next/image";
import classes from "./page.module.css"
import { fetchMealDetails } from "@/lib/meals";

export default function MealsDetails({params}) {
  const mealData = fetchMealDetails(params.mealsSlug);
  
  //Replace line breaks with a <br /> tag in the html data
  mealData.instructions = mealData?.instructions.replace(/\n/g, '<br />');
    return (
      <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={mealData.image} alt="Meal Image" fill/>
        </div>
        <div className={classes.headerText}>
          <h1>{mealData.title}</h1>
          <p className={classes.creator}>
            <a href={`mailto:${mealData.creator_email}`}>{mealData.creator}</a>
          </p>
          <p className={classes.summary}>{mealData.summary}</p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
          __html: mealData.instructions
        }}></p>
      </main>
      </>
    );
  }