import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import Conference from "@/pages/Module/Conference";

const Grammar = lazy(() => import("@/pages/Module/Grammar"));
const Reading = lazy(() => import("@/pages/Module/Reading"));
const Speaking = lazy(() => import("@/pages/Module/Speaking"));
const GrammarLesson = lazy(() => import("@/pages/Lesson/Grammar"));
const ReadingLesson = lazy(() => import("@/pages/Lesson/Reading"));

const Routes: RouteObject[] = [
  {
    path: "/module/test",
    element: <Speaking />,
  },
  {
    path: "/register/:id",
    element: <GrammarLesson />,
  },
  {
    path: "/conference",
    element: <Conference />,
  },
  // {
  // 	path: '/module/grammar/:id',
  // 	element: <GrammarLesson />,
  // },
  // {
  // 	path: '/module/reading',
  // 	element: <Reading />,
  // },
  // {
  // 	path: '/module/reading/:id',
  // 	element: <ReadingLesson />,
  // },
  // {
  // 	path: '/module/speaking',
  // 	element: <Speaking />,
  // },
  // {
  // 	path: '/module/speaking/:id',
  // 	element: <GrammarLesson />,
  // },
];

export default Routes;
