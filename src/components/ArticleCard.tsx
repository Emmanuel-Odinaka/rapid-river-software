import React from 'react';

type ArticleCardProps = {
  title: string;
  body: string;
  userId: number;
};

// truncate long text by passing a max length of the text
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  }
  return text;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ title, body, userId }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2 text-center">
        {truncateText(title, 30)}
      </h2>
      <p className="text-gray-600 mb-4">{truncateText(body, 100)}</p>

      <div className="flex items-center">
        <span className="text-sm font-semibold">Author:</span>
        <span className="text-sm ml-1">{userId}</span>
      </div>
    </div>
  );
};

export default ArticleCard;
