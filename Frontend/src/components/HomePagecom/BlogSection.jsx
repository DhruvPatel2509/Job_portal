import React from "react";

const blogs = [
  {
    title: "5 Tips to Ace Your Next Job Interview",
    description: "Learn how to leave a lasting impression on recruiters.",
    image: "/images/interview.jpg",
  },
  {
    title: "Top Skills in Demand for 2024",
    description: "Find out which skills are trending in the job market.",
    image: "/images/skills.jpg",
  },
  {
    title: "How to Write a Winning Resume",
    description: "Stand out from the crowd with these resume tips.",
    image: "/images/resume.jpg",
  },
];

const BlogSection = () => {
  return (
    <div className="py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Latest <span className="text-[#F83002]">Blogs</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
