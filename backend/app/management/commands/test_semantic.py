from django.core.management.base import BaseCommand
from app.word_service.semantic_service import SemanticChoiceGenerator
class Command(BaseCommand):
    help = 'Test semantic quiz generator'

    def handle(self, *args, **options):
        generator = SemanticChoiceGenerator()


    generator = SemanticChoiceGenerator()
    
    # Test English to Turkish (B2 level)
    test_words_en = [
        'superficial',     # yüzeysel
        'instinctive',     # içgüdüsel
        'provoke',         # kışkırtmak
        'contemplate',     # düşünmek, tasarlamak
        'peculiar',        # tuhaf, garip
        'cynical',         # alaycı
        'deliberate',      # kasıtlı
        'reluctant',       # isteksiz
        'arbitrary',       # keyfi
        'substantial'      # önemli, esaslı
    ]

    for word in test_words_en:
        result = generator.generate_quiz_question(word, 'EN_TO_TR')
        print(f"\nTesting EN_TO_TR for {word}:")
        print(f"Correct answer: {result['correct_answer']}")
        print(f"All options: {result['options']}")

    # Test Turkish to English (mixed common expressions and B2 level equivalents)
    test_words_tr = [
        'alem',           # world, universe
        'el vermek',      # to help, to assist
        'avcı',           # hunter
        'öpmek',          # to kiss
        'kıskanmak',      # to be jealous
        'başarılı',       # successful
        'düşünmek',       # to think
        'karmaşık',       # complex
        'dayanmak',       # to endure
        'gerçekleşmek'    # to come true, to happen
    ]

    for word in test_words_tr:
        result = generator.generate_quiz_question(word, 'TR_TO_ENG')
        print(f"\nTesting TR_TO_ENG for {word}:")
        print(f"Correct answer: {result['correct_answer']}")
        print(f"All options: {result['options']}")

    # Test specific word relationships (for Turkish translations)
    relationship_tests = [
        {
            'word': 'superficial',
            'related': ['shallow', 'surface-level', 'cursory', 'skin-deep']
        },
        {
            'word': 'instinctive',
            'related': ['intuitive', 'innate', 'natural', 'spontaneous']
        },
        {
            'word': 'provoke',
            'related': ['incite', 'irritate', 'agitate', 'trigger']
        }
    ]

    print("\nTesting word relationships:")
    for test in relationship_tests:
        result = generator.generate_quiz_question(test['word'], 'EN_TO_TR')
        print(f"\nWord: {test['word']}")
        print(f"Expected related words: {test['related']}")
        print(f"Generated options: {result['options']}")