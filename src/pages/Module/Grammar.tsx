<<<<<<< HEAD
import { Disc } from "@/components";
import { ModuleService } from "@/services";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { Flex, Layout, notification } from "antd";
import { useEffect, useState } from "react";

export default function Grammar() {
  const service = new ModuleService();
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthStore();

  useEffect(() => {
    (async () => {
      try {
        const data = await service.getAllModules();
        // setData(data[1].lessons);
        setLessons(data[1].lessons as any[]);
        setIsLoading(false);
        console.log(lessons);
      } catch (error) {
        setIsLoading(false);
        notification.error({
          message: "Error Happened",
          duration: 5,
          placement: "topRight",
        });
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
console.log(lessons);

  return (
    <Layout
      className="mt-4"
      style={{
        backgroundColor: "#A3C644",
      }}
    >
      <div className="w-full md:w-[400px] mx-auto px-3 mt-2">
        {lessons?.map((lesson, index) => (
          <Flex
            key={index}
            wrap="wrap"
            justify={index === 0 ? "center" : index % 2 === 1 ? "end" : "start"}
            gap={16}
            style={{ marginBottom: 16 }}
          >
            <Disc title={lesson.title}  />
          </Flex>
        ))}
      </div>
    </Layout>
  );
=======
import { Disc } from '@/components';
import { ModuleService } from '@/services';
import { useModulesStore } from '@/shared/stores/useModulesStore';
import { Flex, Layout, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Grammar() {
	const service = new ModuleService();
	const [lessons, setLessons] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { setCurrentLesson } = useModulesStore();

	useEffect(() => {
		(async () => {
			try {
				const data = await service.getAllModules();
				// setData(data[1].lessons);
				setLessons(data[1].lessons as unknown[]);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				notification.error({
					message: 'Error Happened',
					duration: 5,
					placement: 'topRight',
				});
			}
		})();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Layout
			className='mt-4'
			style={{
				backgroundColor: '#A3C644',
			}}>
			<div className='w-full md:w-[400px] mx-auto px-3 mt-2'>
				{lessons?.map((lesson, index) => (
					<Flex
						key={index}
						wrap='wrap'
						justify={index === 0 ? 'center' : index % 2 === 1 ? 'end' : 'start'}
						gap={16}
						onClick={() => {
							setCurrentLesson(lesson);
							navigate(`./${lesson.title}`);
						}}
						style={{ marginBottom: 16 }}>
						<Disc title={lesson.title} />
					</Flex>
				))}
			</div>
		</Layout>
	);
>>>>>>> 7c8814155294d8e462a68d030ea3601bda3d08db
}
