from .quiz_manager import CreateQuiz
from .models import Tags

def create_quiz_mockdata():
    quiz1 = CreateQuiz(
        title="Food",
        description="Learn about foods",
        author="Oguz",
        time_limit=10
    )
    quiz1.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["A1", "vocabulary"]])

    quiz2 = CreateQuiz(
        title="Animals",
        description="Our furry friends!",
        author="Aras",
        time_limit=10
    )
    quiz2.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["A2", "vocabulary"]])

    quiz3 = CreateQuiz(
        title="Furniture",
        description="Essential furniture",
        author="Kaan",
        time_limit=10
    )
    quiz3.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["B1", "vocabulary"]])

    quiz4 = CreateQuiz(
        title="Plants",
        description="Test your plant knowledge",
        author="Halil",
        time_limit=10
    )
    quiz4.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["B2", "vocabulary"]])

    quiz5 = CreateQuiz(
        title="Transport",
        description="Types of transport",
        author="Alex",
        time_limit=10
    )
    quiz5.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["C1", "vocabulary"]])

    quiz6 = CreateQuiz(
        title="Food",
        description="Learn about foods",
        author="Oguz",
        time_limit=10
    )
    quiz6.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["C2", "vocabulary", "grammar"]])

    quiz7 = CreateQuiz(
        title="Animals",
        description="Our furry friends!",
        author="Aras",
        time_limit=10
    )
    quiz7.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["B2", "grammar"]])

    quiz8 = CreateQuiz(
        title="Furniture",
        description="Essential furniture",
        author="Kaan",
        time_limit=10
    )
    quiz8.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["B1", "grammar"]])

    quiz9 = CreateQuiz(
        title="Plants",
        description="Test your plant knowledge",
        author="Halil",
        time_limit=10
    )
    quiz9.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["A2", "grammar"]])

    quiz10 = CreateQuiz(
        title="Transport",
        description="Types of transport",
        author="Alex",
        time_limit=10
    )
    quiz10.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in ["A1", "grammar"]])
